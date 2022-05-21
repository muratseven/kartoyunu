import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
export const LinksCollection = new Mongo.Collection("links");

export function insertLink({ title, url }) {
  console.log("meteor is running in the client now ?", Meteor.isClient);
  console.log("meteor is running in the server now ?", Meteor.isServer);
  LinksCollection.insert({ title, url, createdAt: new Date() });
}
