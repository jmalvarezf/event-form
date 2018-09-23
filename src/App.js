import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Form from "react-jsonschema-form";

const schema = {
  title: "Simulador de eventos",
  type: "object",
  required: ["eventType",
  "channel",
  "customer",
  "timestamp",
  "products"
  ],
  "properties": {
    "eventType": {
      "$id": "#/properties/eventType",
      "type": "string",
      "title": "Tipo de evento",
      "default": "BUY",
      "enum": ["BUY", "RETURN", "INFO"]
    },
    "channel": {
      "$id": "#/properties/channel",
      "type": "string",
      "title": "Canal de compra",
      "enum": ["WEB", "STORE", "PHONE"],
      "default": "WEB"
    },
    "customer": {
      "$id": "#/properties/customer",
      "type": "object",
      "title": "Cliente",
      "required": [
        "name",
        "address",
        "phoneNumber",
        "customerId"
      ],
      "properties": {
        "name": {
          "$id": "#/properties/customer/properties/name",
          "type": "string",
          "title": "Nombre del cliente",
          "pattern": "^(.*)$"
        },
        "address": {
          "$id": "#/properties/customer/properties/address",
          "type": "string",
          "title": "Direccion del cliente",
          "pattern": "^(.*)$"
        },
        "phoneNumber": {
          "$id": "#/properties/customer/properties/phoneNumber",
          "type": "string",
          "title": "Numero de telefono",
          "pattern": "^[0-9]{9}$"
        },
        "customerId": {
          "$id": "#/properties/customer/properties/customerId",
          "type": "integer",
          "title": "ID del cliente"
        }
      }
    },
    "timestamp": {
      "$id": "#/properties/timestamp",
      "type": "string",
      "title": "Fecha del evento",
      "format": "date-time"
    },
    "products": {
      "$id": "#/properties/products",
      "type": "array",
      "title": "Productos involucrados en el evento",
      "items": {
        "$id": "#/properties/products/items",
        "type": "object",
        "title": "Producto",
        "required": [
          "reference",
          "quantity",
          "price",
          "category"
        ],
        "properties": {
          "reference": {
            "$id": "#/properties/products/items/properties/reference",
            "type": "string",
            "title": "Referencia del producto",
            "enum": ["AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ", "KK", "LL"]
          },
          "quantity": {
            "$id": "#/properties/products/items/properties/quantity",
            "type": "integer",
            "title": "Cantidad",
            "default": 1
          },
          "price": {
            "$id": "#/properties/products/items/properties/price",
            "type": "number",
            "title": "Precio",
            "default": 10.0
          },
          "category": {
            "$id": "#/properties/products/items/properties/category",
            "type": "string",
            "title": "The Category Schema",
            "enum": ["ELECTRONICS", "SPORTS", "FOOD", "FASHION", "COSMETICS"],
            "default": "SPORTS"
          }
        }
      }
    }
  }
};
const log = (type) => console.log.bind(console, type);

const send = ({formData}) => fetch(process.env.REACT_APP_EVENT_API_URL, {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})


class App extends Component {
  render() {
    return (
      <Form schema={schema}
        onChange={log("changed")}
        onSubmit={send}
        onError={log("errors")} />
    );
  }
}

export default App;
