use super::schema::tickets;
use diesel::deserialize::*;
#[derive(Queryable, Debug, Clone)]
pub struct Ticket {
    pub id: i32,
	pub status_code: String,
	pub system_code: String,
	pub title: String,
    pub description: String,
}

#[derive(Insertable, Debug)]
#[table_name="tickets"]
pub struct NewTicket {
	pub status_code: String,
	pub system_code: String,
	pub title: String,
	pub description: String,
}
