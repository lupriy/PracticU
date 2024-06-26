/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type Type = "text";
export type Text1 = string;
export type Isimportant = boolean;
export type Type1 = "separator";
export type Id = string;
export type Text2 = string;
export type Type2 = "video";
export type Source = string;
export type Type3 = "test_task";
export type Id1 = null | number;
export type Header = string;
export type Content1 = string[];
export type Isdonerequired = boolean;
export type Isacceptrequired = boolean;
export type Text3 = string;
export type Iscorrect = null | boolean;
export type Comment = null | string;
export type Options = TestTaskOption[];
export type Isseveral = boolean;
export type Type4 = "detailed_answer_task";
export type Id2 = null | number;
export type Header1 = string;
export type Content2 = string[];
export type Isdonerequired1 = boolean;
export type Isacceptrequired1 = boolean;
export type Type5 = "matching_task";
export type Id3 = null | number;
export type Header2 = string;
export type Content3 = string[];
export type Isdonerequired2 = boolean;
export type Isacceptrequired2 = boolean;
export type Text4 = string;
export type Variants = string[];
export type Correctoptionindex = null | number;
export type Options1 = MatchingTaskOption[];
export type Type6 = "project_task";
export type Id4 = null | number;
export type Header3 = string;
export type Content4 = string[];
export type Isdonerequired3 = boolean;
export type Isacceptrequired3 = boolean;
export type Content = (Text | Separator | Video | TestTask | DetailedAnswerTask | MatchingTask | ProjectTask)[];

export interface Text {
  type: Type;
  text: Text1;
  isImportant: Isimportant;
}
export interface Separator {
  type: Type1;
  id: Id;
  text: Text2;
}
export interface Video {
  type: Type2;
  source: Source;
}
export interface TestTask {
  type: Type3;
  id?: Id1;
  header: Header;
  content: Content1;
  isDoneRequired: Isdonerequired;
  isAcceptRequired: Isacceptrequired;
  options: Options;
  isSeveral: Isseveral;
}
export interface TestTaskOption {
  text: Text3;
  isCorrect?: Iscorrect;
  comment?: Comment;
}
export interface DetailedAnswerTask {
  type: Type4;
  id?: Id2;
  header: Header1;
  content: Content2;
  isDoneRequired: Isdonerequired1;
  isAcceptRequired: Isacceptrequired1;
}
export interface MatchingTask {
  type: Type5;
  id?: Id3;
  header: Header2;
  content: Content3;
  isDoneRequired: Isdonerequired2;
  isAcceptRequired: Isacceptrequired2;
  options: Options1;
}
export interface MatchingTaskOption {
  text: Text4;
  variants: Variants;
  correctOptionIndex?: Correctoptionindex;
}
export interface ProjectTask {
  type: Type6;
  id?: Id4;
  header: Header3;
  content: Content4;
  isDoneRequired: Isdonerequired3;
  isAcceptRequired: Isacceptrequired3;
}
