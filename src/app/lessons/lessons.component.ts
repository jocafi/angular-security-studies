import { Component, OnInit } from "@angular/core";
import {LessonsService} from "../services/lessons.service";
import { Observable, of } from "rxjs";
import {Lesson} from "../model/lesson";
import { AuthService } from "../services/auth.service";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.css"]
})
export class LessonsComponent implements OnInit {


  lessons$: Observable<Lesson[]>;
  isLoggedIn$: Observable<boolean>;

  constructor(private lessonsService: LessonsService, private authService: AuthService) {

  }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err =>  of([])));
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }


}
