class Image < ActiveRecord::Base

  has_attached_file :avatar, :styles => {:thumb => "100x100>"}

  validates_attachment_content_type :avatar, :content_type => ["image/jpg", "image/jpeg", "image/png", "image/gif"]

end
