#[macro_use]
extern crate diesel;
extern crate dotenv;

pub mod schema;
pub mod ticket;

use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

	let test = env!("DATABASE_URL");
	println!("\n test is: {}", test);
    let database_url = "postgres://postgres:Government1@localhost/oxidizedsupport";// env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}


use self::ticket::{Ticket, NewTicket};
// imp diesel::deserialize::FromSql<diesel::sql_types::Nullable<diesel::sql_types::Text>, diesel::pg::Pg> for *const str {
// 	fn FromSql(&self) {}
// }

pub fn create_ticket(conn: &PgConnection, title: String, description: String, status_code: String, system_code: String) -> Ticket{
    use schema::tickets;

	print!("title: {}, description: {}, status: {}, system: {}", title, description,status_code, system_code);

    let new_ticket = NewTicket {
		status_code: status_code,
		system_code: system_code,
		title: title,
		description: description

	};
	
    diesel::insert_into(tickets::table)
        .values(&new_ticket)
		//.execute(conn)
		.get_result(conn)
        .expect("Error saving new ticket")
}