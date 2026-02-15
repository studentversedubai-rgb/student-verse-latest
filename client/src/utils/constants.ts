export const UNIVERSITY_DOMAINS: string[] = [
    // General academic domains
    'edu',
    'ac.uk',
    'edu.au',
    'ac.nz',
    'edu.sg',
    'ac.ae', // UAE universities
    'edu.ae',
    'ac.in', // India
    'edu.in',
    'ac.za', // South Africa
    'edu.za',
    'ac.jp', // Japan
    'edu.cn', // China
    'edu.hk', // Hong Kong
    'edu.my', // Malaysia
    'edu.pk', // Pakistan
    'edu.ph', // Philippines
    'edu.sa', // Saudi Arabia
    'edu.qa', // Qatar
    'edu.kw', // Kuwait
    'edu.bh', // Bahrain
    'edu.om', // Oman
    'edu.eg', // Egypt
    'edu.jo', // Jordan
    'edu.lb', // Lebanon
    'edu.tr', // Turkey
    'edu.br', // Brazil
    'edu.mx', // Mexico
    'edu.ar', // Argentina
    'edu.co', // Colombia
    'edu.pe', // Peru
    'edu.cl', // Chile
    // European academic domains
    'ac.at', // Austria
    'ac.be', // Belgium
    'edu.es', // Spain
    'edu.fr', // France (some universities)
    'edu.it', // Italy (some universities)
    'edu.pl', // Poland
    'student.saedubai.com', // sae uni
    'edu.ru', // Russia
    // Specific well-known universities
    'student.uva.nl',
    'student.vu.nl',
    'uni-heidelberg.de',
    'student.ethz.ch',
    'ox.ac.uk',
    'cam.ac.uk',
    'mit.edu',
    'stanford.edu',
    'harvard.edu',
    'berkeley.edu',
    'yale.edu',
    'princeton.edu',
    'columbia.edu',
    'upenn.edu',
    'nyu.edu',
    'cornell.edu',
    'ucla.edu',
    'usc.edu',
    // Specific university domains for UAE and international students
    'uowmail.edu.au', // University of Wollongong
    'rit.edu', // Rochester Institute of Technology
    'hw.ac.uk', // Heriot-Watt University
    'live.mdx.ac.uk', // Middlesex University
    'student.curtin.edu.au', // Curtin University
    'student.murdoch.edu.au', // Murdoch University
    'student.bham.ac.uk', // University of Birmingham
    'sae.edu', // SAE Institute
    'mymail.aud.edu', // American University in Dubai
    'g.aus.edu', // American University of Sharjah
    'aus.edu', // American University of Sharjah
    'students.ud.ac.ae', // University of Dubai
    'students.cud.ac.ae', // City University Dubai
    'zu.ac.ae', // Zayed University
    'hct.ac.ae', // Higher Colleges of Technology
    'ku.ac.ae', // Khalifa University
    'uaeu.ac.ae', // United Arab Emirates University
    'sharjah.ac.ae', // University of Sharjah
    'ajman.ac.ae', // Ajman University
    'adu.ac.ae', // Abu Dhabi University
    'aau.ac.ae', // Al Ain University
    'skylineuniversity.ac.ae', // Skyline University College
    'gmu.ac.ae', // Gulf Medical University
    'sorbonne.ae', // Sorbonne University Abu Dhabi
    'dubai.bits-pilani.ac.in', // BITS Pilani Dubai
    'manipaldubai.com', // Manipal University Dubai
    'learner.manipal.edu', // Manipal Academy
    'amitydubai.ae', // Amity University Dubai
    'amityuniversity.ae', // Amity University
    'spjain.org', // SP Jain School of Global Management
    'student.aurak.ac.ae', // American University of Ras Al Khaimah
    'rakmhsu.ac.ae', // RAK Medical & Health Sciences University
    'uof.ac.ae', // University of Fujairah
    'eau.ac.ae', // Emirates Aviation University
    'student.buid.ac.ae', // British University in Dubai
    'alqasimia.ac.ae', // Al Qasimia University
    'lih.ac.ae', // London Institute of Higher Education
    'fchs.ac.ae', // Fatima College of Health Sciences
    'dmu.ac.uk', // De Montfort University
    'southwales.ac.uk', // University of South Wales
    'hbmsu.ac.ae', // Hamdan Bin Mohammed Smart University
    'mbzuai.ac.ae', // Mohamed bin Zayed University of AI
    'eahm.ac.ae', // Emirates Academy of Hospitality Management
    'ra.ac.ae', // Rochester Institute of Technology Dubai
    'cu.ac.ae', // Canadian University Dubai
    'uaq.ac.ae', // Umm Al Quwain University
    'alwasl.ac.ae', // Al Wasl University
    'ect.ac.ae', // Emirates College of Technology
    'adsm.ac.ae', // Abu Dhabi School of Management
    'modul.ac.ae', // Modul University Dubai
    'strath.ac.uk', // University of Strathclyde
    'dpa.ac.ae', // Dubai Police Academy
];

export const SECURITY_CONFIG = {
    MAX_REFERRALS_PER_IP: 5,
    MAX_SIGNUPS_PER_IP: 3,
    REFERRAL_CODE_LENGTH: 8,
    SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
    MAX_FAILED_ATTEMPTS: 5,
} as const;

export const QUEUE_CONFIG = {
    COUNTDOWN_DURATION: 72 * 60 * 60 * 1000, // 72 hours
    POSITION_UPDATE_INTERVAL: 5000, // 5 seconds
} as const;

export const VERIFICATION_UI_CONFIG = {
    OTP_LENGTH: 6,
    OTP_EXPIRY_DISPLAY: '10 minutes',
    RESEND_COOLDOWN_DISPLAY: '60 seconds',
    MAX_ATTEMPTS_DISPLAY: 5,
    LOCKOUT_DISPLAY: '15 minutes',
} as const;

export const REFERRAL_MILESTONES = [
    { count: 1, reward: 'Move up 5 positions', color: 'azure', bonus: 5 },
    { count: 5, reward: 'Move up 15 positions', color: 'cyan', bonus: 15 },
    { count: 10, reward: 'Move up 30 positions', color: 'violet', bonus: 30 },
    { count: 25, reward: 'Priority access', color: 'gold', bonus: 100 },
] as const;
