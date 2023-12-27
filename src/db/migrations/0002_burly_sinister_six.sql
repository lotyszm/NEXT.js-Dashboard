CREATE TABLE IF NOT EXISTS "resetPasswordsTokens" (
	"identifier" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT resetPasswordsTokens_identifier_token_pk PRIMARY KEY("identifier","token")
);
