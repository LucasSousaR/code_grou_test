require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module CodeGrou
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # TimeZone
    config.time_zone = 'America/Sao_Paulo'
    config.active_record.default_timezone = :local
    # config.active_record.time_zone_aware_attributes = 'America/Sao_Paulo'

    # I18n
    config.i18n.default_locale = 'pt-BR'
    Time::DATE_FORMATS[:default] = "%d/%m/%Y %H:%M:%S"
    Date::DATE_FORMATS[:default] = "%d/%m/%Y"

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
      end
    end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
