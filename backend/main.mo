import Text "mo:core/Text";
import List "mo:core/List";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  // Types
  type Service = {
    id : Text;
    title : Text;
    description : Text;
    icon : Storage.ExternalBlob;
  };

  type Project = {
    id : Text;
    title : Text;
    description : Text;
    image : Storage.ExternalBlob;
    createdAt : Time.Time;
  };

  type ContactMessage = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Modules
  module Project {
    public func compare(left : Project, right : Project) : Order.Order {
      Text.compare(left.title, right.title);
    };
  };

  // Data
  var nextMessageId = 0;

  // Services management
  let services = Map.empty<Text, Service>();

  public shared ({ caller }) func addService(id : Text, title : Text, description : Text, icon : Storage.ExternalBlob) : async () {
    let service : Service = {
      id;
      title;
      description;
      icon;
    };

    services.add(id, service);
  };

  public query ({ caller }) func getService(id : Text) : async Service {
    switch (services.get(id)) {
      case (null) { Runtime.trap("Service does not exist.") };
      case (?service) { service };
    };
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  // Portfolio management
  let projectList = List.empty<Project>();

  public shared ({ caller }) func addProject(id : Text, title : Text, description : Text, image : Storage.ExternalBlob) : async () {
    // Check if project already exists
    let exists = projectList.any(func(p) { p.id == id });
    if (exists) {
      Runtime.trap("Project with this id already exists!");
    };

    let project : Project = {
      id;
      title;
      description;
      image;
      createdAt = Time.now();
    };

    projectList.add(project);
  };

  public query ({ caller }) func getProject(id : Text) : async Project {
    switch (projectList.find(func(p) { p.id == id })) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) { project };
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projectList.toArray().sort();
  };

  public shared ({ caller }) func updateProject(id : Text, title : Text, description : Text) : async () {
    let newList = projectList.map<Project, Project>(
      func(p) {
        if (p.id == id) {
          return {
            id;
            title;
            description;
            image = p.image;
            createdAt = p.createdAt;
          };
        };
        p;
      }
    );
    projectList.clear();
    projectList.addAll(newList.values());
  };

  public shared ({ caller }) func removeProject(title : Text) : async () {
    let newList = projectList.filter(func(p) { p.title != title });
    projectList.clear();
    projectList.addAll(newList.values());
  };

  // Contact messages
  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      id = nextMessageId;
      name;
      email;
      message;
      timestamp = Time.now();
    };

    contactMessages.add(contactMessage);
    nextMessageId += 1;
  };

  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };

  // Switch for portfolio item visibility
  let visibility = Map.empty<Principal, Bool>();

  public shared ({ caller }) func setVisibility(isVisible : Bool) : async () {
    visibility.add(caller, isVisible);
  };

  public query ({ caller }) func isVisible(user : Principal) : async Bool {
    switch (visibility.get(user)) {
      case (null) { false };
      case (?visible) { visible };
    };
  };

  public shared ({ caller }) func toggleVisibility(user : Principal) : async () {
    switch (visibility.get(user)) {
      case (null) { visibility.add(user, true) };
      case (?current) { visibility.add(user, not current) };
    };
  };

  // Admin functions
  public shared ({ caller }) func clearAllData() : async () {
    services.clear();
    visibility.clear();
    projectList.clear();
    contactMessages.clear();
  };
};
