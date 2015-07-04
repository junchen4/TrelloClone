secret = Rails.env.production? ? ENV['SECRET_TOKEN'] : "top_secret_token"
TrelloClone::Application.config.secret_key_base = secret