# run: appcenter codepush release-react -a isofhvn/ISOFHCARE-ANDROID-USER-TEST -d Production -m 
# nếu bản update là bắt buộc phải cập nhật đến người dùng ngay khi mở app.
# 
echo deploy to JAY-APP-ANDROID-TEST
appcenter codepush release-react -a gnurt250394/JAY-APP-ANDROID-TEST -d Production

# run: appcenter codepush release-react -a isofhvn/ISOFHCARE-IOS-USER-TEST -d Production -m 
echo deploy to JAY-APP-IOS-TEST
appcenter codepush release-react -a gnurt250394/JAY-APP-IOS-TEST -d Production