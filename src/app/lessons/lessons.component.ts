import { Observable, of } from "rxjs";

import { catchError } from "rxjs/operators";
import { Component, OnInit } from "@angular/core";
import { LessonsService } from "../services/lessons.service";
import { Lesson } from "../model/lesson";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-lessons",
  templateUrl: "./lessons.component.html",
  styleUrls: ["./lessons.component.css"]
})
export class LessonsComponent implements OnInit {

  lessons$: Observable<Lesson[]>;

  constructor(private lessonsService: LessonsService, private auth: AuthService) {

  }

  ngOnInit() {
    this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err =>  of([])));
  }

}
