import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Provider from './models/Provider.js';
import Category from './models/Category.js';

const PASSWORD = 'Password@123';

const s = (name, startingPrice) => ({ name, startingPrice });

const categories = [
    { name: 'Plumbing', icon: '🔧', description: 'Leaks, taps, pipes, drains and bathroom fittings',
      services: [s('Pipe Leakage', 300), s('Tap Repair', 250), s('Drain Cleaning', 400), s('Bathroom Fittings', 500), s('Toilet Repair', 350), s('Water Tank', 600)] },
    { name: 'Electrical', icon: '💡', description: 'Wiring, switches, fans and lighting',
      services: [s('Switch & Socket Repair', 200), s('Fan Installation', 300), s('Wiring', 500), s('MCB / Fuse', 350), s('Light Fitting', 250)] },
    { name: 'Cleaning', icon: '🧹', description: 'Deep cleaning for home and kitchen',
      services: [s('Home Deep Cleaning', 1200), s('Kitchen Cleaning', 800), s('Bathroom Cleaning', 500), s('Sofa Cleaning', 700)] },
    { name: 'AC & Appliance', icon: '❄️', description: 'AC, washing machine and refrigerator service',
      services: [s('AC Service', 600), s('AC Repair', 500), s('Washing Machine Repair', 400), s('Refrigerator Repair', 450)] },
    { name: 'Carpentry', icon: '🪚', description: 'Furniture, doors and wooden fittings',
      services: [s('Furniture Repair', 400), s('Door Fitting', 350), s('Modular Kitchen', 1500), s('Wardrobe Repair', 500)] },
    { name: 'Painting', icon: '🎨', description: 'Interior and exterior painting',
      services: [s('Interior Painting', 2000), s('Exterior Painting', 3000), s('Wall Repair & Putty', 800)] },
    { name: 'Pest Control', icon: '🐜', description: 'Cockroach, termite and bed bug control',
      services: [s('Cockroach Control', 700), s('Termite Control', 1500), s('Bed Bug Control', 1000)] },
    { name: 'Locksmith', icon: '🔐', description: 'Lock repair, replacement and emergency unlock',
      services: [s('Lock Repair', 300), s('Key Duplication', 100), s('Lock Replacement', 450), s('Emergency Unlock', 500)] },
];

// coords are [longitude, latitude]
const providers = [
    { name: 'Ramesh Kumar', email: 'ramesh@vt.com', phone: '9000000001', category: 'Plumbing', services: ['Pipe Leakage', 'Tap Repair', 'Drain Cleaning', 'Bathroom Fittings'], experienceYears: 8, priceFrom: 250, languages: ['Tamil', 'English'], address: 'T. Nagar, Chennai', coords: [80.2341, 13.0418], rating: 4.8, reviewCount: 127, completedJobs: 342, verificationLevel: 'certified', status: 'Approved' },
    { name: 'Suresh Babu', email: 'suresh@vt.com', phone: '9000000002', category: 'Electrical', services: ['Switch & Socket Repair', 'Fan Installation', 'Wiring'], experienceYears: 6, priceFrom: 200, languages: ['Tamil', 'Telugu'], address: 'Adyar, Chennai', coords: [80.257, 13.0067], rating: 4.6, reviewCount: 88, completedJobs: 210, verificationLevel: 'experience', status: 'Approved' },
    { name: 'Lakshmi Devi', email: 'lakshmi@vt.com', phone: '9000000003', category: 'Cleaning', services: ['Home Deep Cleaning', 'Kitchen Cleaning', 'Bathroom Cleaning'], experienceYears: 5, priceFrom: 500, languages: ['Tamil', 'English', 'Hindi'], address: 'Anna Nagar, Chennai', coords: [80.2101, 13.085], rating: 4.7, reviewCount: 64, completedJobs: 150, verificationLevel: 'experience', status: 'Approved' },
    { name: 'Mohammed Ibrahim', email: 'ibrahim@vt.com', phone: '9000000004', category: 'AC & Appliance', services: ['AC Service', 'AC Repair', 'Washing Machine Repair'], experienceYears: 10, priceFrom: 400, languages: ['Tamil', 'English', 'Hindi'], address: 'Velachery, Chennai', coords: [80.218, 12.9815], rating: 4.9, reviewCount: 203, completedJobs: 480, verificationLevel: 'certified', status: 'Approved' },
    { name: 'Venkat Reddy', email: 'venkat@vt.com', phone: '9000000005', category: 'Plumbing', services: ['Pipe Leakage', 'Toilet Repair', 'Water Tank'], experienceYears: 7, priceFrom: 300, languages: ['Telugu', 'English', 'Tamil'], address: 'Porur, Chennai', coords: [80.1565, 13.0382], rating: 4.5, reviewCount: 51, completedJobs: 120, verificationLevel: 'experience', status: 'Approved' },
    { name: 'Anil Nair', email: 'anil@vt.com', phone: '9000000006', category: 'Carpentry', services: ['Furniture Repair', 'Door Fitting', 'Wardrobe Repair'], experienceYears: 9, priceFrom: 350, languages: ['Malayalam', 'Tamil', 'English'], address: 'Mylapore, Chennai', coords: [80.2676, 13.0368], rating: 4.7, reviewCount: 72, completedJobs: 165, verificationLevel: 'certified', status: 'Approved' },
    { name: 'Karthik Raja', email: 'karthik@vt.com', phone: '9000000007', category: 'Painting', services: ['Interior Painting', 'Wall Repair & Putty'], experienceYears: 4, priceFrom: 800, languages: ['Tamil'], address: 'Tambaram, Chennai', coords: [80.1, 12.9249], rating: 4.3, reviewCount: 18, completedJobs: 40, verificationLevel: 'basic', status: 'Approved' },
    { name: 'Balaji S', email: 'balaji@vt.com', phone: '9000000008', category: 'Pest Control', services: ['Cockroach Control', 'Termite Control'], experienceYears: 6, priceFrom: 700, languages: ['Tamil', 'English'], address: 'Guindy, Chennai', coords: [80.2206, 13.0067], rating: 4.4, reviewCount: 39, completedJobs: 95, verificationLevel: 'experience', status: 'Approved' },
    { name: 'Joseph Xavier', email: 'joseph@vt.com', phone: '9000000009', category: 'Locksmith', services: ['Lock Repair', 'Emergency Unlock'], experienceYears: 3, priceFrom: 300, languages: ['Tamil', 'English'], address: 'Sholinganallur, Chennai', coords: [80.2279, 12.901], rating: 0, reviewCount: 0, completedJobs: 0, verificationLevel: 'basic', status: 'Pending' },
];

const run = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected. Clearing old data...');
    await Promise.all([User.deleteMany({}), Provider.deleteMany({}), Category.deleteMany({})]);

    await Category.create(categories);

    await User.create({ name: 'Admin', email: 'admin@vinaithunai.com', phone: '9999999999', password: PASSWORD, role: 'admin' });
    await User.create({ name: 'Gowtham S', email: 'gowtham@vt.com', phone: '9000001001', password: PASSWORD, role: 'customer', preferredLanguage: 'Tamil' });
    await User.create({ name: 'Priya R', email: 'priya@vt.com', phone: '9000001002', password: PASSWORD, role: 'customer', preferredLanguage: 'English' });

    for (const p of providers) {
        const { coords, status, ...rest } = p;
        const user = await User.create({
            name: p.name, email: p.email, phone: p.phone, password: PASSWORD,
            role: 'provider', preferredLanguage: p.languages[0],
        });
        await Provider.create({
            ...rest,
            user: user._id,
            verificationStatus: status,
            location: { type: 'Point', coordinates: coords },
        });
    }

    await Provider.syncIndexes(); // make sure the 2dsphere index exists

    console.log('\nSeed complete. Password for every account: ' + PASSWORD);
    console.log('  Admin    : admin@vinaithunai.com');
    console.log('  Customer : gowtham@vt.com  |  priya@vt.com');
    console.log('  Provider : ramesh@vt.com (Plumbing, Tamil/English)  |  venkat@vt.com (Telugu plumber)');
    console.log('  Pending provider for admin demo: joseph@vt.com');
    await mongoose.disconnect();
};

run().catch(async (err) => {
    console.error(err);
    await mongoose.disconnect();
    process.exit(1);
});