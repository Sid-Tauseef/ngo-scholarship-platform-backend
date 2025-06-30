// scripts/migrateUsers.js
const mongoose  = require('mongoose');
const User      = require('../src/features/users/user.model');
const Member    = require('../src/features/members/member.model');
const Institute = require('../src/features/institutes/institute.model');
const Student   = require('../src/features/students/student.model');
const LegacyUser= require('../src/features/users/users.model'); // old admin model

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const bulk = [];

  // Helper to enqueue upserts
  function enqueue(docs, role) {
    docs.forEach(doc => {
      const { _id, name, email, password, __v, ...rest } = doc;
      bulk.push({
        updateOne: {
          filter: { email },
          update: {
            $setOnInsert: {
              name, email, password, role,
              profile: rest
            }
          },
          upsert: true
        }
      });
    });
  }

  // Migrate each collection
  enqueue(await Member.find().lean(),    'MEMBER');
  enqueue(await Institute.find().lean(), 'INSTITUTE');
  enqueue(await Student.find().lean(),   'STUDENT');
  enqueue(await LegacyUser.find({ role: 'ADMIN' }).lean(), 'ADMIN');

  if (bulk.length) {
    await User.bulkWrite(bulk, { ordered: false });
    console.log(`Migrated ${bulk.length} users.`);
  }

  // Optionally drop old collections:
  // await mongoose.connection.dropCollection('members');
  // await mongoose.connection.dropCollection('institutes');
  // await mongoose.connection.dropCollection('students');
  // await mongoose.connection.dropCollection('users'); // legacy model

  mongoose.disconnect();
}

migrate().catch(err => {
  console.error(err);
  process.exit(1);
});
