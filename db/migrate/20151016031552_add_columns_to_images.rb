class AddColumnsToImages < ActiveRecord::Migration
  def change
    add_column :images, :data, :json, default: '{}', null: false
    add_column :images, :status, :string
  end
end
