
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "accommodations";

ALTER SCHEMA "accommodations" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "accommodations"."gender" AS ENUM (
    'male',
    'female',
    'other'
);

ALTER TYPE "accommodations"."gender" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "accommodations"."images" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "c_public_id" "text",
    "c_url" "text",
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "accommodations"."images" OWNER TO "postgres";

COMMENT ON TABLE "accommodations"."images" IS 'stores links to all images at cloudinary';

CREATE TABLE IF NOT EXISTS "accommodations"."profiles" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "is_student" boolean,
    "is_landlord" boolean,
    "date_of_birth" "date",
    "username" "text",
    "bio" "text",
    "photo_id" "uuid" DEFAULT "gen_random_uuid"(),
    "first_name" "text",
    "last_name" "text",
    "address_l1" "text",
    "address_l2" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text"
);

ALTER TABLE "accommodations"."profiles" OWNER TO "postgres";

COMMENT ON TABLE "accommodations"."profiles" IS 'stores all user profiles';

COMMENT ON COLUMN "accommodations"."profiles"."address_l1" IS 'Address Line 1';

CREATE TABLE IF NOT EXISTS "accommodations"."properties" (
    "id" bigint NOT NULL,
    "street_addr" "text" NOT NULL,
    "zip_code" "text" NOT NULL,
    "city" "text" NOT NULL,
    "state" "text" NOT NULL,
    "country" "text" NOT NULL,
    "rent" double precision NOT NULL,
    "avg_utilities" double precision,
    "posted_by" "text",
    "desc" "text",
    "image_url" "text" NOT NULL,
    "bedrooms" bigint,
    "full_baths" bigint,
    "half_baths" bigint,
    "is_house" boolean,
    "is_apt" boolean
);

ALTER TABLE "accommodations"."properties" OWNER TO "postgres";

COMMENT ON TABLE "accommodations"."properties" IS 'stores all properties';

COMMENT ON COLUMN "accommodations"."properties"."bedrooms" IS 'Number of bedrooms at this property';

COMMENT ON COLUMN "accommodations"."properties"."full_baths" IS 'Number of bathrooms with shower and toilet';

COMMENT ON COLUMN "accommodations"."properties"."half_baths" IS 'Number of bathrooms with toilet but no shower';

COMMENT ON COLUMN "accommodations"."properties"."is_house" IS 'Is the property a standalone house';

COMMENT ON COLUMN "accommodations"."properties"."is_apt" IS 'Is the property an apartment';

ALTER TABLE ONLY "accommodations"."images"
    ADD CONSTRAINT "images_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "accommodations"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "accommodations"."properties"
    ADD CONSTRAINT "properties_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "accommodations"."profiles"
    ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Enable insert for authenticated users only" ON "accommodations"."images" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "accommodations"."profiles" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON "accommodations"."properties" FOR SELECT USING (true);

ALTER TABLE "accommodations"."images" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "accommodations"."profiles" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "accommodations"."properties" ENABLE ROW LEVEL SECURITY;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "accommodations"."properties";

GRANT USAGE ON SCHEMA "accommodations" TO "anon";
GRANT USAGE ON SCHEMA "accommodations" TO "authenticated";
GRANT USAGE ON SCHEMA "accommodations" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "accommodations"."images" TO "anon";
GRANT ALL ON TABLE "accommodations"."images" TO "authenticated";
GRANT ALL ON TABLE "accommodations"."images" TO "service_role";

GRANT ALL ON TABLE "accommodations"."profiles" TO "anon";
GRANT ALL ON TABLE "accommodations"."profiles" TO "authenticated";
GRANT ALL ON TABLE "accommodations"."profiles" TO "service_role";

GRANT ALL ON TABLE "accommodations"."properties" TO "anon";
GRANT ALL ON TABLE "accommodations"."properties" TO "authenticated";
GRANT ALL ON TABLE "accommodations"."properties" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "accommodations" GRANT ALL ON TABLES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
