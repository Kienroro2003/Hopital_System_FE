import {Component, Inject, OnInit} from '@angular/core';
import {CustomerServiceService} from '../../service/customer/customer-service.service';
import {CustomerTypeService} from '../../service/customer/customer-type.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICustomerType} from '../../model/customer/icustomer-type';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {NotifierService} from 'angular-notifier';
import {ICustomer} from '../../model/customer/icustomer';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

    constructor(private customerService: CustomerServiceService,
                private customerTypeService: CustomerTypeService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private notification: NotifierService,
                @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    }
    checkerr: ICustomer;
    loading = false;
    customerTypes: ICustomerType[];
    form: FormGroup;
    customerId = 0;
    setAvatar = 0;
    selectedImage: any;
    // url: any;
    upLoadImage = null;
    oldAvatarLink: string;
    url = 'https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail.jpg';
    customerExistCreate = '';
    customerEmail = '';
    customerListString: string[] = [];
    customerListStringEmail: string[] = [];
    customerCodeExistCreateSearch = '';
    customerCodeExistCreateSearchEmail = '';
    customerEmailExistUpdateSearch = '';
    customerEmailExistUpdate = '';
    emailCheck: string;
    noticeExistEmail = '';
    validationMessages = {
        customerName: [
            {type: 'required', message: 'Tên không được để trống'},
            {type: 'pattern', message: 'Tên không đúng định dạng'}
        ],
        customerCode: [
            // {type: 'required', message: 'Mã khách hàng không được để trống'},
            {type: 'pattern', message: 'Mã khách hàng không đúng định dạng'}
        ],
        customerAvatar: [
            {type: 'required', message: 'Avatar không được để trống'},
            // {type: 'pattern', message: 'Tên không chứa kí tự đặc biệt'}
        ],
        customerId: [
            {type: 'required', message: 'Mã Khách Hàng không được để trống'},
            {type: 'pattern', message: 'Tên không chứa kí tự đặc biệt'}
        ],
        customerAddress: [
            {type: 'required', message: 'Địa chỉ không được để trống'},
            {type: 'pattern', message: 'Địa chỉ không chứa kí tự đặc biệt'}
        ],
        customerPhone: [
            {type: 'required', message: 'Số điện thoại không được để trống'},
            {type: 'pattern', message: 'Số điện thoại không đúng định dạng'}
        ],
        customerEmail: [
            {type: 'required', message: 'Email không được để trống'},
            {type: 'pattern', message: 'Email định dạng abc@gmail.com'}
        ],
        customerTypeId: [
            {type: 'required', message: 'Số Điện Thoại không được để trống'},
            {type: 'pattern', message: 'Số điện thoại dạng 10-12 số'}
        ],
    };

    ngOnInit(): void {
        this.customerTypeService.getAll().subscribe(customerTypes => this.customerTypes = customerTypes);
        this.form = new FormGroup({
            customerId: new FormControl(''),
            // , Validators.required
            customerName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
            // , Validators.required
            // [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]
            customerCode: new FormControl('', [Validators.required, Validators.pattern('^MKH-\\d{3}$')]),
            // /, Validators.required
            // , [Validators.required, Validators.pattern('^MKH-\\d{3}$')]
            // customerAvatar: new FormControl('', Validators.required),
            customerAvatar: new FormControl(''),
            // , Validators.required
            customerAddress: new FormControl('', Validators.required),
            // , Validators.required
            customerPhone: new FormControl('', [Validators.required, Validators.pattern('^(03|05|07|09)\\d{8,10}$')]),
            // , Validators.required
            customerEmail: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@gmail.com$')]),
            // , Validators.required
            // , [Validators.required, Validators.pattern('^[a-zA-Z0-9]+@gmail.com$')]
            customerTypeId: new FormControl('', Validators.required),
            // , Validators.required
        });
        // [Validators.required, Validators.pattern('^(03|05|07|09)\\d{8,10}$')])
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            const customerId = paramMap.get('id');
            console.log(customerId);
            if (customerId !== null) {
                this.customerId = Number(customerId);
                this.customerService.findCustomerById(this.customerId).subscribe(customer => {
                    this.form.patchValue(customer);
                    this.url = customer.customerAvatar;
                });
            }
        });
    }

    compare(o1: ICustomerType, o2: ICustomerType) {
        if (o1 === null || o2 === null) {
            return false;
        }
        return o1.customerTypeId === o2.customerTypeId;
    }

    showPreview(event: any) {
        this.selectedImage = event.target.files[0];
    }

    submit() {
        console.log(1);
        if (this.form.valid) {
            console.log(2);
            if (this.customerId === 0) {
                this.loading = true;
                console.log(3);
                const avatarName = this.getCurrentDateTime() + this.upLoadImage.name;
                const fileRef = this.storage.ref(avatarName);
                this.storage.upload(avatarName, this.upLoadImage).snapshotChanges().pipe(
                    finalize(() => {
                        fileRef.getDownloadURL().subscribe(url => {
                            this.form.patchValue({customerAvatar: url});

                            // //delete old img from firebase
                            // this.storage.storage.refFromURL(this.oldAvatarLink).delete();

                            // Update employee
                            console.log(this.form.value);
                            this.customerService.create(this.form.value).subscribe(
                                () => {
                                    this.loading = true;
                                },
                                (error) => {
                                    if (error.status === 500) {
                                        this.router.navigateByUrl('/auth/access-denied');
                                    }
                                    if (error.status === 400) {
                                        this.checkerr = error.error;
                                    }
                                    this.loading = false;
                                },
                                () => {
                                    this.upLoadImage = null;
                                    this.loading = false;
                                    // this.form.reset();
                                    this.notification.notify('success', 'Thêm mới khách hàng thành công');
                                },
                            );
                        });
                    })
                ).subscribe();
                // const nameImg = this.getCurrentDateTime() + this.selectedImage;
                // console.log(nameImg);
                // const fileRef = this.storage.ref(nameImg);
                // this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
                //   finalize(() => {
                //     fileRef.getDownloadURL().subscribe((url) => {
                //       this.form.patchValue({customerAvatar: url});
                // this.customerService.create(this.form.value).subscribe(
                //   () => {
                //   },
                //   (error) => {
                //     if (error.status === 500) {
                //       this.router.navigateByUrl('/auth/access-denied');
                //     }
                //   },
                //   () => {
                //     alert('thêm mới khách hàng');
                //     this.router.navigateByUrl('customer/list');
                //   }
                // );
                //
                //     });
                //   })
                // ).subscribe();
            } else {
                if (this.upLoadImage != null) {
                    const avatarNameUpdate = this.getCurrentDateTime() + this.upLoadImage.name;
                    const fileRef = this.storage.ref(avatarNameUpdate);
                    this.storage.upload(avatarNameUpdate, this.upLoadImage).snapshotChanges().pipe(
                        finalize(() => {
                            fileRef.getDownloadURL().subscribe(url => {
                                this.form.patchValue({customerAvatar: url});

                                // //delete old img from firebase
                                // this.storage.storage.refFromURL(this.oldAvatarLink).delete();


                                // Update employee
                                console.log(this.form.value);
                                this.customerService.update(this.form.value).subscribe(
                                    () => {
                                        this.loading = true;
                                    },
                                    (error) => {
                                        if (error.status === 500) {
                                            this.router.navigateByUrl('/auth/access-denied');
                                        }
                                        // if (error.status === 400) {
                                        //     // this.checkerr = error.error;
                                        // }
                                        // this.loading = false;
                                    },
                                    () => {
                                        this.loading = false;
                                        this.notification.notify('success', 'Cập Nhật khách hàng thành công');
                                        this.upLoadImage = null;
                                    },
                                );
                            });
                        })
                    ).subscribe();
                    //   this.customerService.update(this.form.value).subscribe(
                    //     () => {
                    //     },
                    //     (error) => {
                    //       if (error.status === 500) {
                    //         this.router.navigateByUrl('/auth/access-denied');
                    //       }
                    //     },
                    //     () => {
                    //       alert('update khách hàng');
                    //       this.router.navigateByUrl('customer/list');
                    //     }
                    //   );
                    // }
                } else {
                    console.log('vao update');
                    this.customerService.update(this.form.value).subscribe(
                        () => {
                            this.loading = true;
                        },
                        (error) => {
                            if (error.status === 500) {
                                this.router.navigateByUrl('/auth/access-denied');
                            }
                        },
                        () => {
                            this.loading = false;
                            console.log('vao complete');
                            this.notification.notify('success', 'Cập Nhật khách hàng thành công');
                            this.upLoadImage = null;
                        },
                    );
                }
            }
        }
    }


    getCurrentDateTime(): string {
        return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
    }

    onSelectFile(e) {
        this.setAvatar =  1;
        this.upLoadImage = e.target.files[0];
        if (e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event: any) => {
                this.url = event.target.result;
                // this.form.controls.customerAvatar = event.target.result;
            };
        }
        console.log(this.url);
        // this.url = e.target.files[0];
    }

    checkCustomerCode() {
        this.customerService.findAllCustomerString().subscribe(data => {
            this.customerListString = data;
        }, () => {
        }, () => {
            if (this.form.get('customerCode').valid) {
                if (this.customerListString.indexOf(this.customerCodeExistCreateSearch) > -1) {
                    this.customerExistCreate = 'Mã khach hang đã tồn tại';
                } else {
                    this.customerExistCreate = '';
                }
            } else {
                this.customerExistCreate = '';
            }
        });
    }
    checkCustomerEmail() {
        this.customerService.findAllEmailCustomerString().subscribe(data => {
            this.customerListStringEmail = data;
        }, () => {
        }, () => {
            if (this.form.get('customerEmail').valid) {
                if (this.customerListStringEmail.indexOf(this.customerCodeExistCreateSearchEmail) > -1) {
                    this.customerEmail = 'Email khách hàng đã tồn tại';
                } else {
                    this.customerEmail = '';
                }
            } else {
                this.customerEmail = '';
            }
        });
    }

    checkExistEmail() {
        if  (this.form.get('customerEmail').valid) {
            this.customerService.checkExistEmail(this.customerId, this.form.get('customerEmail').value).subscribe(
                next => this.noticeExistEmail = 'Email khách hàng đã tồn tại',
                error => this.noticeExistEmail = ''
            );
        } else {
            this.noticeExistEmail = '';
        }
    }
}
