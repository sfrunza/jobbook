class AddExtraTimeToJobs < ActiveRecord::Migration[7.0]
  def change
    add_column :jobs, :extra_time, :float
  end
end
