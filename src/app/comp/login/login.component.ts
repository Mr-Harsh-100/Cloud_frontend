import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: `
  /* Google Drive Inspired OTP Verification */
.otp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  position: relative;
}

.otp-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 450px;
}

.otp-title {
  color: #202124;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
}

.otp-description {
  color: #5f6368;
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
}

.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #5f6368;
  font-size: 14px;
}

.form-group input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border 0.2s ease;
}

.form-group input:focus {
  border-color: #1a73e8;
  outline: none;
}

.form-group i {
  position: absolute;
  left: 12px;
  top: 38px;
  color: #5f6368;
}

.error-message {
  color: #d93025;
  font-size: 12px;
  margin-top: 4px;
}

.submit-btn, .verify-btn {
  width: 100%;
  padding: 12px;
  background: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.submit-btn:hover, .verify-btn:hover {
  background: #1765cc;
}

.submit-btn:disabled, .verify-btn:disabled {
  background: #f1f3f4;
  color: #9aa0a6;
  cursor: not-allowed;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 10px;
}

.otp-inputs input {
  width: 40px;
  height: 48px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: border 0.2s ease;
}

.otp-inputs input:focus {
  border-color: #1a73e8;
  outline: none;
}

.resend-container {
  text-align: center;
  margin-bottom: 24px;
}

.resend-container button {
  background: none;
  border: none;
  color: #1a73e8;
  cursor: pointer;
  font-size: 14px;
}

.resend-container button:disabled {
  color: #9aa0a6;
  cursor: not-allowed;
}

/* Notification Toast */
.notification-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.notification-toast.success {
  background: #34a853;
}

.notification-toast.error {
  background: #ea4335;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
  `
})

export class LoginComponent implements OnInit {
  otpForm: FormGroup;
  emailForm: FormGroup;
  showOtpForm = false;
  countdown = 0;
  resendDisabled = false;
  notification = {
    show: false,
    message: '',
    type: '' // 'success' | 'error'
  };

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit2: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit3: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit4: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit5: ['', [Validators.required, Validators.pattern('[0-9]')]],
      digit6: ['', [Validators.required, Validators.pattern('[0-9]')]]
    });
  }
  ngOnInit(): void {
  }

  sendOtp() {
    if (this.emailForm.valid) {
      const email = this.emailForm.value.email;

      // Simulate API call
      this.http.post('/api/send-otp', { email }).subscribe({
        next: () => {
          this.showOtpForm = true;
          this.startCountdown();
          this.showNotification('OTP sent to your email', 'success');
        },
        error: () => {
          // this.showOtpForm = true;
          // this.startCountdown();
          // this.showNotification('OTP sent to your email', 'success');
          this.showNotification('Failed to send OTP', 'error');
        }
      });
    }
  }

  verifyOtp() {
    if (this.otpForm.valid) {
      const otp = Object.values(this.otpForm.value).join('');
      const email = this.emailForm.value.email;

      this.http.post('/api/verify-otp', { email, otp }).subscribe({
        next: (response: any) => {
          if (response.verified) {
            this.showNotification('Verification successful!', 'success');
          } else {
            this.showNotification('Invalid OTP', 'error');
          }
        },
        error: () => {
          // if (true) {
          //   this.showNotification('Verification successful!', 'success');
          // } else {
          //   this.showNotification('Invalid OTP', 'error');
          // }

          this.showNotification('Verification failed', 'error');
        }
      });
    }
  }

  startCountdown() {
    this.resendDisabled = true;
    this.countdown = 30;
    const timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(timer);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  showNotification(message: string, type: 'success' | 'error') {
    this.notification = { show: true, message, type };
    setTimeout(() => {
      this.notification.show = false;
    }, 3000);
  }

  moveFocus(event: any, nextInput: HTMLInputElement) {
    if (event.target.value.length === 1) {
      nextInput.focus();
    }
  }
}