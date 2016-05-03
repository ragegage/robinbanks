# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160503171802) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lists", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "list_head"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "lists", ["user_id"], name: "index_lists_on_user_id", unique: true, using: :btree

  create_table "stock_list_items", force: :cascade do |t|
    t.integer  "list_id",            null: false
    t.integer  "stock_id",           null: false
    t.integer  "next_stock_list_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  add_index "stock_list_items", ["list_id"], name: "index_stock_list_items_on_list_id", using: :btree
  add_index "stock_list_items", ["stock_id", "list_id"], name: "index_stock_list_items_on_stock_id_and_list_id", unique: true, using: :btree
  add_index "stock_list_items", ["stock_id"], name: "index_stock_list_items_on_stock_id", using: :btree

  create_table "stocks", force: :cascade do |t|
    t.string   "ticker_symbol", null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "stocks", ["ticker_symbol"], name: "index_stocks_on_ticker_symbol", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
