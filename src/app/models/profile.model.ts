export interface ProfileModel {
    created_at: Date;
    email: string;
    email_verified: boolean;
    identities: Identity[];
    name: string;
    nickname: string;
    picture: string;
    updated_at: Date;
    user_id: string;
    last_ip: string;
    last_login: Date;
    logins_count: number;
}

 interface Identity {
    user_id: string;
    provider: string;
    connection: string;
    isSocial: boolean;
    profileData?: ProfileData;
}

 interface ProfileData {
    email: string;
    email_verified: boolean;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    locale?: string;
    jti?: string;
    typ?: string;
    session_state?: string;
    s_hash?: string;
    sid?: string;
    preferred_username?: string;
}
