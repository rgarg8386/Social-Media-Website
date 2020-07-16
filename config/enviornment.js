const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'rgarg2_be17@thapar.edu',
            pass: 'rahulgarg3422@'
        }
    },
    google_client_id: "77013127825-6i5ja2u1e466ct9b716fpplgj9go0a04.apps.googleusercontent.com",
    google_client_secret: "69zN22J7Y2GascOBtrHBz1z1",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codieal"
}

const production = {
    name: 'production'
}

module.exports = development;