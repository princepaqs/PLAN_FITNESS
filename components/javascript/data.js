const cashiers = [
    {
        id: 'C001',
        name: 'John Alvin P. Estrella',
        nickname: 'Alvin',
        email: 'admin@gmail.com', //alvin.admin@pf.com
        password: 'admin',
        contact: '09123456789',
        address: 'San Marcos, Maypajo, Caloocan City, NCR',
        dayOff: 'wednesday',
        nickname: 'alvin',
        dateHired: '01/01/2025',
        status: 'active',
    }
]

// Trainers
const trainers = [
    {
        id: 'T001',
        name: 'Prince Paquiado',
        email: 'prince@gmail.com',
        password: 'prince',
        contact: '09123456789',
        status: 'Available',
        profile: '../../assets/images/Icon.png'
    },
    {
        id: 'T002',
        name: 'Lexus Guevara',
        email: 'lexus@gmail.com',
        password: 'lexus',
        contact: '09123456789',
        status: 'Available',
        profile: '../../assets/images/Icon.png'
    },
    {
        id: 'T003',
        name: 'Nicole Frances Meneses',
        email: 'nicole@gmail.com',
        password: 'nicole',
        contact: '09123456789',
        status: 'On Leave',
        profile: '../../assets/images/Icon.png'
    }
]

const members = [
    {
        id: 'PF001',
        name: 'Jacob Sullivan',
        contact: '09123456789',
        joinDate: 'Feb-02-2025',
        endDate: 'Aug-02-2025',
        plan: 'N/A',
        status: 'Inactive'
    },
    {
        id: 'PF002',
        name: 'Mia Anderson',
        contact: '09123456789',
        joinDate: 'Feb-05-2025',
        endDate: 'May-05-2025',
        plan: 'EGP-03',
        status: 'Active'
    },
    {
        id: 'PF003',
        name: 'Noa Ramirez',
        contact: '09123456789',
        joinDate: 'Feb-07-2025',
        endDate: 'Sep-07-2025',
        plan: 'SWP-06',
        status: 'Active'
    },
    {
        id: 'PF004',
        name: 'Emma Thompson',
        contact: '09123456789',
        joinDate: 'Feb-09-2025',
        endDate: 'Apr-09-2025',
        plan: 'SFP-01',
        status: 'Active'
    },
    {
        id: 'PF005',
        name: 'Lucas Gonzales',
        contact: '09123456789',
        joinDate: 'Feb-11-2025',
        endDate: 'Feb-11-2026',
        plan: 'BFP-03',
        status: 'Active'
    },
    {
        id: 'PF006',
        name: 'Sophia Carter',
        contact: '09123456789',
        joinDate: 'Feb-13-2025',
        endDate: 'Aug-13-2025',
        plan: 'CFM-12',
        status: 'Active'
    },
    {
        id: 'PF007',
        name: 'Benjamin Ortiz',
        contact: '09123456789',
        joinDate: 'Feb-14-2025',
        endDate: 'Nov-14-2025',
        plan: 'BTP-01',
        status: 'Active'
    },
    {
        id: 'PF008',
        name: 'Olivia Brooks',
        contact: '09123456789',
        joinDate: 'Feb-17-2025',
        endDate: 'Jun-17-2025',
        plan: 'PTP-06',
        status: 'Active'
    },
    {
        id: 'PF009',
        name: 'Daniel Moreno',
        contact: '09123456789',
        joinDate: 'Feb-19-2025',
        endDate: 'Mar-19-2025',
        plan: 'TSP-03',
        status: 'Active'
    },
    {
        id: 'PF010',
        name: 'Isabella Hughes',
        contact: '09123456789',
        joinDate: 'Feb-23-2025',
        endDate: 'Jul-21-2025',
        plan: 'TAM-12',
        status: 'Active'
    },
    {
        id: 'PF011',
        name: 'Ethan Wallace',
        contact: '09123456789',
        joinDate: 'Feb-23-2025',
        endDate: 'Dec-23-2025',
        plan: 'ETP-06',
        status: 'Active'
    },
    {
        id: 'PF012',
        name: 'Ava Fernandez',
        contact: '09123456789',
        joinDate: 'Feb-26-2025',
        endDate: 'May-26-2025',
        plan: 'PTP-12',
        status: 'Active'
    },
    {
        id: 'PF013',
        name: 'Nathaniel Scott',
        contact: '09123456789',
        joinDate: 'Feb-28-2025',
        endDate: 'Oct-28-2025',
        plan: 'BFP-01',
        status: 'Active'
    },
]

const plan = [
    {
        id: 'BFP-01',
        name: 'Basic Fit Plan',
        validity: '1 month',
        sessions: 'N/A',
        amount: '999',
    },
    {
        id: 'EGP-03',
        name: 'Essential Gym Plan',
        validity: '3 months',
        sessions: 'N/A',
        amount: '2799',
    },
    {
        id: 'SWP-06',
        name: 'Standard Workout Plan',
        validity: '6 months',
        sessions: 'N/A',
        amount: '5499',
    },
    {
        id: 'SFP-01',
        name: 'Starter Fit Plan',
        validity: '1 month',
        sessions: 'N/A',
        amount: '1099',
    },
    {
        id: 'BFP-03',
        name: 'Basic Fitness Package',
        validity: '3 months',
        sessions: 'N/A',
        amount: '2999',
    },
    {
        id: 'CFM-12',
        name: 'Core Fitness Membership',
        validity: '12 months',
        sessions: 'N/A',
        amount: '9999',
    },
    {
        id: 'BTP-01',
        name: 'Basic Trainer Plan',
        validity: '1 month',
        sessions: '3',
        amount: '1299',
    },
    {
        id: 'PTP-06',
        name: 'Personal Trainer Package',
        validity: '6 months',
        sessions: '18',
        amount: '5999',
    },
    {
        id: 'TSP-03',
        name: 'Training Support Plan',
        validity: '3 months',
        sessions: '9',
        amount: '3199',
    },
    {
        id: 'TAM-12',
        name: 'Trainer Assisted Membership',
        validity: '12 months',
        sessions: '36',
        amount: '10499',
    },
    {
        id: 'ETP-06',
        name: 'Elite Trainer Program',
        validity: '6 months',
        sessions: '18',
        amount: '6499',
    },
    {
        id: 'PTP-12',
        name: 'Pro Trainer Plan',
        validity: '12 months',
        sessions: '36',
        amount: '11999',
    },
]

const transactions = [
    {
        id: 'TR002',
        name: 'Mia Anderson',
        joinDate: 'Feb-05-2025',
        endDate: 'May-05-2025',
        month: 'Feb',
        datePaid: 'Feb-13-2025',
        plan: 'EGP-03',
        status: 'Active'
    },
    {
        id: 'TR003',
        name: 'Noa Ramirez',
        joinDate: 'Feb-07-2025',
        endDate: 'Sep-07-2025',
        month: 'Feb',
        datePaid: 'Feb-14-2025',
        plan: 'SWP-06',
        status: 'Active'
    },
    {
        id: 'TR004',
        name: 'Emma Thompson',
        joinDate: 'Feb-09-2025',
        endDate: 'Apr-09-2025',
        month: 'Feb',
        datePaid: 'Feb-15-2025',
        plan: 'SFP-01',
        status: 'Active'
    },
    {
        id: 'TR005',
        name: 'Lucas Gonzales',
        joinDate: 'Feb-11-2025',
        endDate: 'Feb-11-2026',
        month: 'Feb',
        datePaid: 'Feb-16-2025',
        plan: 'BFP-03',
        status: 'Active'
    },
    {
        id: 'TR006',
        name: 'Sophia Carter',
        joinDate: 'Feb-13-2025',
        endDate: 'Aug-13-2025',
        month: 'Feb',
        datePaid: 'Feb-17-2025',
        plan: 'CFM-12',
        status: 'Active'
    },
    {
        id: 'TR007',
        name: 'Benjamin Ortiz',
        joinDate: 'Feb-14-2025',
        endDate: 'Nov-14-2025',
        month: 'Feb',
        datePaid: 'Feb-18-2025',
        plan: 'BTP-01',
        status: 'Active'
    },
    {
        id: 'TR008',
        name: 'Olivia Brooks',
        joinDate: 'Feb-17-2025',
        endDate: 'Jun-17-2025',
        month: 'Feb',
        datePaid: 'Feb-19-2025',
        plan: 'PTP-06',
        status: 'Active'
    },
    {
        id: 'TR009',
        name: 'Daniel Moreno',
        joinDate: 'Feb-19-2025',
        endDate: 'Mar-19-2025',
        month: 'Feb',
        datePaid: 'Feb-20-2025',
        plan: 'TSP-03',
        status: 'Active'
    },
    {
        id: 'TR010',
        name: 'Isabella Hughes',
        joinDate: 'Feb-23-2025',
        endDate: 'Jul-21-2025',
        month: 'Feb',
        datePaid: 'Feb-21-2025',
        plan: 'TAM-12',
        status: 'Active'
    },
    {
        id: 'TR011',
        name: 'Ethan Wallace',
        joinDate: 'Feb-23-2025',
        endDate: 'Dec-23-2025',
        month: 'Feb',
        datePaid: 'Feb-22-2025',
        plan: 'ETP-06',
        status: 'Active'
    },
    {
        id: 'TR012',
        name: 'Ava Fernandez',
        joinDate: 'Feb-26-2025',
        endDate: 'May-26-2025',
        month: 'Feb',
        datePaid: 'Feb-23-2025',
        plan: 'PTP-12',
        status: 'Active'
    },
    {
        id: 'TR013',
        name: 'Nathaniel Scott',
        joinDate: 'Feb-28-2025',
        endDate: 'Oct-28-2025',
        month: 'Feb',
        datePaid: 'Feb-24-2025',
        plan: 'BFP-01',
        status: 'Active'
    },
]

const logs = [
    {
        id: 'L001',
        user: 'Admin',
        type: 'Add Trainer',
        date: 'Feb-13-2025',
        description: 'Added Lexus as Trainer.',
    },
    {
        id: 'L002',
        user: 'Admin',
        type: 'Add Cashier',
        date: 'Feb-14-2025',
        description: 'Added Alvin as Cashier',
    },
    {
        id: 'L003',
        user: 'Prince',
        type: 'Payment',
        date: 'Feb-15-2025',
        description: `Processed TR004's payment for SFP-01`,
    },
    {
        id: 'L004',
        user: 'Prince',
        type: 'Payment',
        date: 'Feb-16-2025',
        description: `Processed TR005's payment for BFP-03`,
    },
    {
        id: 'LR005',
        user: 'Lexus',
        type: 'Payment',
        date: 'Feb-17-2025',
        description: `Processed TR006's payment for CFM-12`,
    },
    {
        id: 'LR006',
        user: 'Lexus',
        type: 'Payment',
        date: 'Feb-18-2025',
        description: `Processed TR007's payment for BTP-01`,
    },
    {
        id: 'LR007',
        user: 'Prince',
        type: 'Payment',
        date: 'Feb-19-2025',
        description: `Processed TR008's payment for PTP-06`,
    },
    {
        id: 'LR008',
        user: 'Lexus',
        type: 'Payment',
        date: 'Feb-20-2025',
        description: `Processed TR009's payment for TSP-03`,
    },
    {
        id: 'LR009',
        user: 'Lexus',
        type: 'Payment',
        date: 'Feb-21-2025',
        description: `Processed TR010's payment for TAM-12`,
    },
    {
        id: 'LR010',
        user: 'Prince',
        type: 'Payment',
        date: 'Feb-22-2025',
        description: `Processed TR011's payment for ETP-06`,
    },
    {
        id: 'LR011',
        user: 'Prince',
        type: 'Payment',
        date: 'Feb-23-2025',
        description: `Processed TR012's payment for PTP-12`,
    },
    {
        id: 'LR012',
        user: 'Lexus',
        type: 'Payment',
        date: 'Feb-24-2025',
        description: `Processed TR012's payment for BFP-01`,
    },
]

export { trainers, members, cashiers, plan, transactions, logs };
