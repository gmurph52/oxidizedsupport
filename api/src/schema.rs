table! {
    audits (id) {
        id -> Int4,
        #[sql_name = "type"]
        type_ -> Nullable<Varchar>,
        table_name -> Nullable<Varchar>,
        field_name -> Nullable<Varchar>,
        p_k -> Nullable<Varchar>,
        old_value -> Nullable<Varchar>,
        new_value -> Nullable<Varchar>,
        update_date -> Date,
        user_name -> Nullable<Varchar>,
    }
}

table! {
    comments (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        tocket_id -> Nullable<Int4>,
        body_text -> Nullable<Varchar>,
        created_date -> Date,
    }
}

table! {
    roles (code) {
        code -> Varchar,
        name -> Nullable<Varchar>,
        enabled -> Nullable<Bool>,
    }
}

table! {
    statuses (code) {
        code -> Varchar,
        name -> Nullable<Varchar>,
        enabled -> Nullable<Bool>,
        color -> Nullable<Varchar>,
        icon -> Nullable<Varchar>,
    }
}

table! {
    systems (code) {
        code -> Varchar,
        name -> Nullable<Varchar>,
        enabled -> Nullable<Bool>,
    }
}

table! {
    ticket_assignments (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        ticket_id -> Nullable<Int4>,
    }
}

table! {
    tickets (id) {
        id -> Int4,
        status_code -> Varchar,
        system_code -> Varchar,
        title -> Nullable<Varchar>,
        description -> Nullable<Varchar>,
    }
}

table! {
    user_roles (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        role_code -> Varchar,
        start_date -> Date,
        end_date -> Nullable<Date>,
        notes -> Nullable<Varchar>,
    }
}

table! {
    users (id) {
        id -> Int4,
        domain_user_name -> Nullable<Varchar>,
        is_active -> Nullable<Bool>,
        deleted -> Nullable<Bool>,
        first_name -> Varchar,
        last_name -> Nullable<Varchar>,
        email_address -> Nullable<Varchar>,
    }
}

joinable!(comments -> tickets (tocket_id));
joinable!(comments -> users (user_id));
joinable!(ticket_assignments -> tickets (ticket_id));
joinable!(ticket_assignments -> users (user_id));
joinable!(tickets -> statuses (status_code));
joinable!(tickets -> systems (system_code));
joinable!(user_roles -> roles (role_code));
joinable!(user_roles -> users (user_id));

allow_tables_to_appear_in_same_query!(
    audits,
    comments,
    roles,
    statuses,
    systems,
    ticket_assignments,
    tickets,
    user_roles,
    users,
);
