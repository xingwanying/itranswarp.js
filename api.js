// api:

function APIError(err_code, err_data, err_message) {
    this.error = err_code;
    this.data = err_data;
    this.message = err_message;
}

var api = {
    invalid_param: function(paramName) {
        return new APIError('parameter:invalid', paramName, 'Invalid parameter: ' + paramName);
    },
    not_allowed: function(err_message) {
        return new APIError('permission:notallowed', '', err_message);
    },
    not_found: function(err_data, err_message) {
        return new APIError('resource:notfound', err_data, err_message);
    },
    server_error: function(err_code, err_data, err_message) {
        if (err_code instanceof Error) {
            return new APIError('500', err_code.message, err_code.stack);
        }
        if (err_code && err_code.error) {
            return err_code;
        }
        return new APIError(err_code, err_data, err_message);
    },
    error: function(err_code, err_data, err_message) {
        console.log('create APIError: ' + err_code + ',' + err_data + ',' + err_message);
        return new APIError(err_code, err_data, err_message);
    },
    APIError: APIError
}

exports = module.exports = api;