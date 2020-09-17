CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "chef_id" int,
  "image" text,
  "title" text,
  "ingredients" text[],
  "preparation" text[],
  "information" text,
  "status" text,
  "created_at" timestamp DEFAULT (now())
);
CREATE TABLE "chefs" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "avatar_url" text,
  "created_at" timestamp DEFAULT (now())
);
ALTER TABLE "recipes" ADD FOREIGN KEY ("chef_id") REFERENCES "chefs" ("id");
CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "name" text,
  "path" text NOT NULL
);
CREATE TABLE "recipe_files" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int REFERENCES recipes(id),
  "file_id" int REFERENCES files(id)
);
ALTER TABLE "recipes" DROP COLUMN "image"
ALTER TABLE "chefs" DROP COLUMN "avatar_url"
ALTER TABLE "chefs" ADD "file_id" int REFERENCES "files" ("id")
ALTER TABLE "recipes" ADD "updated_at" timestamp DEFAULT (now())

CREATE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at =NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp
BEFORE UPDATE ON recipes
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp()

ALTER TABLE "files" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipe_files" ("recipe_id");

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "name" text not null,
  "email" text UNIQUE not null,
  "password" text not null,
  "reset_token" text,
  "reset_token_expires" text,
  "is_admin" boolean DEFAULT false,
  "created_at" timestamp DEFAULT (now()),
  "updated_at" timestamp DEFAULT (now())
);


CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);
ALTER TABLE "session" 
ADD CONSTRAINT "session_pkey" 
PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;