const apiUrl = 'https://agile-peak-97684.herokuapp.com/api/';

export function parseFormToJson(formdata) {
    let values = {};
    new FormData(formdata).forEach(function (value, key) {
        values[key] = value;
    });
    return JSON.stringify(values);
}

export const apiRequest = (action, method, data, f) => {
    let url = action !== 'distance' ? (apiUrl + action) : 'https://dev.virtualearth.net/REST/v1/Routes';
    let body;

    if (method === 'GET' || method === 'DELETE') {
        body = undefined;
        url += '/' + data;
    } else if (data !== null) {
        if (data instanceof HTMLFormElement)
            body = parseFormToJson(data);
        else body = data;
    }

    fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: method,
        body: body
    })
        .then(response => {
            return (response.status === 200) ? response.json() : response.status;
        })
        .then(response => {
            f(response);
        })
        .catch(error => console.log(error));
};
