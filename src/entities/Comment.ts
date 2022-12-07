import { Exclude, Expose } from "class-transformer";
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  Index,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { makeId } from "../utils/helpers";
import BaseEntity from "./Entity";
import Post from "./Post";
import User from "./User";
import Vote from "./Vote";

@Entity("comments")
export default class Comment extends BaseEntity {
  @Index()
  @Column({ unique: true })
  identifier: string;

  @Column()
  body: string;

  @Column({ nullable: true })
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number {
    const initialValue = 0;
    return this.votes?.reduce(
      (previousValue, currentObject) =>
        previousValue + (currentObject.value || 0),
      initialValue
    );
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
