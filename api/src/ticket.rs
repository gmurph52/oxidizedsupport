use super::schema::tickets;
// use rocket_contrib::json::{Json};
use serde::Serialize;
use rocket::request::FromForm;


// use num_derive::FromPrimitive; // 0.2.4 (the derive)
// use num_traits::FromPrimitive; // 0.2.6 (the trait)


#[derive(Queryable, Debug, Clone, Serialize)]
pub struct Ticket {
    pub id: i32,
	pub status_code: String,
	pub system_code: String,
	pub title: String,
    pub description: String,
}

#[derive(Insertable, Debug,FromForm)]
#[table_name="tickets"]
pub struct NewTicket {
	pub status_code: String,
	pub system_code: String,
	pub title: String,
	pub description: String,
}
