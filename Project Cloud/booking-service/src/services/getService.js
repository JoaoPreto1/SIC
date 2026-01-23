const axios = require('axios');

const CATALOG_SERVICE_URL = 'http://api-gateway:8080/api/catalog/services';

async function getServiceById(serviceId, token) {
    const response = await axios.get(
        `${CATALOG_SERVICE_URL}/${serviceId}`,
        {
            headers: {
                Authorization: token
            }
        }
    );

    return response.data;
}

module.exports = { getServiceById };
