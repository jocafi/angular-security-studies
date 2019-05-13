import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LessonsComponent } from "./lessons/lessons.component";

const routes: Routes = [
  {
    path: "lessons",
    component: LessonsComponent
  },
  {
    path: "",
    redirectTo: "/lessons",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/lessons",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
