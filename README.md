# workerjs-logging

## Example

```javascript
const logger = require("workerjs-logging");

const filters = {
	'WARNING': {
		log_type: 'WARNING'
	},
	'ERROR': {
		log_type: 'ERROR'
	},
	'IM': {
		'tags': {
			$all: ['IMPLEMENT_SUBSCRIBER_HANDLER', 'IMPLEMENT_MESSAGE_HANDLER']
		}
	}
};

const message = {
	id: 1,
	date: '2018-12-21 10:10:54',
	log_type: 'ERROR',
	request_type: 'PUT',
	request_link: '/some/link.json',
	request_method: 'HTTP/1.1',
	request_status: 500,
	request_code: 995903,
	callstack: 'Clients first request, second request, third request, final request...',
	error_message: 'Internal server error',
	tags: ['IMPLEMENT_SUBSCRIBER_HANDLER', 'IMPLEMENT_MESSAGE_HANDLER']
};

logger.log(message);
```


