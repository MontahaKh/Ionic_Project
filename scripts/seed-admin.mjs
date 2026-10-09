import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(
  readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf8')
);

initializeApp({ credential: cert(serviceAccount) });

const auth = getAuth();
const db = getFirestore();

const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('ADMIN_EMAIL et ADMIN_PASSWORD sont requis dans .env');
  process.exit(1);
}

async function seedAdmin() {
  let user;
  try {
    user = await auth.getUserByEmail(ADMIN_EMAIL);
    console.log('Compte Auth déjà existant :', user.uid);
  } catch (e) {
    if (e.code !== 'auth/user-not-found') throw e;
    user = await auth.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      emailVerified: true,
    });
    console.log('Compte Auth créé :', user.uid);
  }

  await db.collection('users').doc(user.uid).set(
    {
      id: user.uid,
      firstName: 'Admin',
      lastName: 'Système',
      age: 30,
      email: ADMIN_EMAIL,
      role: 'admin',
      active: true,
      createdAt: new Date().toISOString(),
    },
    { merge: true }
  );

  console.log('Profil admin enregistré dans Firestore.');
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });