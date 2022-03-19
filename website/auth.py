from flask import Blueprint, render_template, request, flash, redirect, url_for
from . import db
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)


@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm-password')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email already used, try another one or login', category='error')
        else:
            if len(name) < 3:
                flash('Name must be more than 2 characters', category='error')
            elif len(password) < 4:
                flash('Password must be greater than 4 characters', category='error')
            elif password != confirm_password:
                flash('Confirm password don\'t match password', category='error')
            else:
                new_user = User(email=email, name=name, password=generate_password_hash(password, method='sha256'))
                db.session.add(new_user)
                db.session.commit()
                flash('User created successfully', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))

    return render_template('sign-up.html', user=current_user)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(email=email).first()
        if user:
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                flash('Incorrect password', category='error')

        else:
            flash('User does not exist', category='error')

    return render_template('login.html', user=current_user)


@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))
