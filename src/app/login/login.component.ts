import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css", "../common/forms.css"]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  messagePerErrorCode = {
    loginfailed: "Invalid credentials"
  };

  errors = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.form = this.fb.group({
      email: ["test@gmail.com", Validators.required],
      password: ["Password10", Validators.required]
    });

  }

  ngOnInit() {

  }


  login() {

    const formValue = this.form.value;

    if (formValue.email && formValue.password) {
      this.authService.login(formValue.email, formValue.password).subscribe(() => {
        console.log("User is logged in");
        this.router.navigateByUrl("/");
      });
    }


  }

}
