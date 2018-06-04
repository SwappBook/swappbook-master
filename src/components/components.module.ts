import { NgModule } from '@angular/core';

import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { GoogleLoginComponent } from './google-login/google-login';
@NgModule({
	declarations: [GoogleLoginComponent,
    GoogleLoginComponent],
	imports: [
		CommonModule,
		IonicModule
	],
	exports: [GoogleLoginComponent,
    GoogleLoginComponent]
})
export class ComponentsModule {}
