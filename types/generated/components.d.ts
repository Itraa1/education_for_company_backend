import type { Schema, Struct } from '@strapi/strapi';

export interface TopicTopic extends Struct.ComponentSchema {
  collectionName: 'components_topic_topics';
  info: {
    displayName: 'topic';
    icon: 'book';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'topic.topic': TopicTopic;
    }
  }
}
