table! {
    audits (id) {
        id -> Int4,
        #[sql_name = "type"]
        type_ -> Varchar,
        table_name -> Varchar,
        field_name -> Varchar,
        p_k -> Varchar,
        old_value -> Varchar,
        new_value -> Varchar,
        update_date -> Date,
        user_name -> Varchar,
    }
}

table! {
    comments (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        tocket_id -> Nullable<Int4>,
        body_text -> Varchar,
        created_date -> Date,
    }
}

table! {
    roles (code) {
        code -> Varchar,
        name -> Varchar,
        enabled -> Nullable<Bool>,
    }
}

table! {
    statuses (code) {
        code -> Varchar,
        name -> Varchar,
        enabled -> Nullable<Bool>,
        color -> Varchar,
        icon -> Varchar,
    }
}

table! {
    systems (code) {
        code -> Varchar,
        name -> Varchar,
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
        title -> Varchar,
        description -> Varchar,
    }
}

table! {
    user_roles (id) {
        id -> Int4,
        user_id -> Nullable<Int4>,
        role_code -> Varchar,
        start_date -> Date,
        end_date -> Nullable<Date>,
        notes -> Varchar,
    }
}

table! {
    users (id) {
        id -> Int4,
        domain_user_name -> Varchar,
        is_active -> Nullable<Bool>,
        deleted -> Nullable<Bool>,
        first_name -> Varchar,
        last_name -> Varchar,
        email_address -> Varchar,
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
