export interface AnnotationMention {
  type: "DATE" | "PERSON" | "ORGANISATION" | "ROLE";
  content: string;
  begin_offset: number;
  end_offset: number;
  metadata?: any;
}

export interface AnnotatedDocument {
  text: string;
  mentions: AnnotationMention[];
}

export type AnnotationController = boolean[];
