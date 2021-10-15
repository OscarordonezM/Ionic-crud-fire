import { Component, OnInit } from "@angular/core";
import { Post } from "../models/post.model";
import {
  ToastController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.page.html",
  styleUrls: ["./add-post.page.scss"]
})
export class AddPostPage implements OnInit {
  post = {} as Post;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async createPost(post: Post) {
    // console.log(post);

    if (this.formValidation()) {
      // console.log("ready to submit");

      // show loader
      let loader = await this.loadingCtrl.create({
        message: "Please wait..."
      });
      loader.present();

      try {
        await this.firestore.collection("posts").add(post);
      } catch (e) {
        this.showToast(e);
      }

      // dismiss loader
      loader.dismiss();

      // redirect to home page
      this.navCtrl.navigateRoot("home");
    }
  }

  formValidation() {
    if (!this.post.title) {
      // show toast message
      this.showToast("Ingrese titulo");
      return false;
    }

    if (!this.post.details) {
      // show toast message
      this.showToast("Ingrese descripción");
      return false;
    }

    if (!this.post.type) {
      // show toast message
      this.showToast("Ingrese tipo");
      return false;
    }

    if (!this.post.eventMagazine) {
      // show toast message
      this.showToast("Ingrese evento revista");
      return false;
    }

    if (!this.post.doi) {
      // show toast message
      this.showToast("Ingrese codigo identificador");
      return false;
    }

    if (!this.post.anioPub) {
      // show toast message
      this.showToast("Ingrese año publicacion");
      return false;
    }

    return true;
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }
}