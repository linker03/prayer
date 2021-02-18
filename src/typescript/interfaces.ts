import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';

export interface ICard {
  checked: boolean;
  columnId: number;
  commentsIds: [number];
  description: string;
  id: number;
  title: string;
}

export type MaterialTabParamList = {
  todo: {columnId: number};
  'in Progress': {columnId: number};
  testing: {columnId: number};
  done: {columnId: number};
};

export type ColumnScreenNavigationProp = BottomTabNavigationProp<
  MaterialTabParamList,
  any
>;
export type ColumnScreenRouteProp = RouteProp<
  MaterialTabParamList,
  'todo' | 'in Progress' | 'testing' | 'done'
>;

export interface IComment {
  id: number;
  body: string;
  created: string;
}

export interface IColumn {
  id: number;
  title: string;
  userId: 1662;
}

// export interface ICommentStorage {
//   [key: number]: IComment;
//   allIds: number[];
// }

// export interface IParams {
//   author: string;
// }

// export interface ICardDenormalized {
//   id: number;
//   title: string;
//   column: string;
//   body: string;
//   author: string;
//   commentsArray: IComment[];
// }

// export interface IRootState {
//   cards: ICard[];
//   comments: ICommentStorage;
//   params: IParams;
// }
