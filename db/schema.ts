import {
  boolean,
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  pgEnum
} from "drizzle-orm/pg-core"
import type { AdapterAccountType } from "next-auth/adapters"





export const userRoleEnum = pgEnum("user_role", ["admin", "user", "editor"]);

export const userPlanEnum = pgEnum("user_plan", ["Free","Pro"]);


export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),

  role: userRoleEnum("role").default("user").notNull(),
  plan: userPlanEnum("plan").default("Free").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  hashedPassword : text("hashedPassword"), 
  isOauth : boolean("isOauth"),
  image: text("image"),
})


 
export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),

    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()).notNull(),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 
export const verificationTokens = pgTable(
  "verificationToken",
  {
    id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
    email : text('email').unique().notNull(), 
    emailReplaced : text("emailReplaced"), 


    token: text("token").notNull(),
    expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
  },
  
)

export const passwordTokens = pgTable(
    "passwordToken",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      code : text('code').notNull(), 
      expiresAt: timestamp("expires_at", { mode: "date" }).notNull(), // expiration date
      email : text('email').unique().notNull(), 
     
    },
    
  )
 
export const folders = pgTable(
    "folders",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      name : text("name").notNull(),
      createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
      userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
      color : text("color").notNull(),
      sharable :boolean("sharable").notNull().default(false), 
      
      
     
    },
  )

export const folderLikes = pgTable(
    "folderLikes",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      
      createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
      folderId : text("folderId").notNull().references(() => folders.id, { onDelete: "cascade" }),
      userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
      
      
      
     
    },
  )

export const folderComments = pgTable(
    "folderComments",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      
      createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
      folderId : text("folderId").notNull().references(() => folders.id, { onDelete: "cascade" }),
      text : text("text").notNull(), 
      userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
      
      
      
     
    },
  )

export const notes = pgTable(
    "notes",
    {
      id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
      userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
      folderId: text("folderId")
      .notNull()
      .references(() => folders.id, { onDelete: "cascade" }),
      starred : boolean("starred").notNull().default(false), 
      title : text("Title").notNull().default("Untitled"), 
      text : text("content"),
      html : text("html"),
      createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
      updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()).notNull(),
      color : text("color").notNull()


      
     
    },
    
  )