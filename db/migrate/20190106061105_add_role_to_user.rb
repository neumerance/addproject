class AddRoleToUser < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :role, :string, :default => :subscriber # roles are :subscriber, :admin, :room_master
  end

  def down
    remove_column :users, :role
  end
end
