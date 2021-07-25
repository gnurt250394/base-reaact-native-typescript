# run: appcenter codepush release-react -a isofhvn/ISOFHCARE-ANDROID-USER-TEST -d Production -m 
# nếu bản update là bắt buộc phải cập nhật đến người dùng ngay khi mở app.
# 
echo deploy to HAIR-SALON-ANDROID-TEST
appcenter codepush release-react -a gnurt250394/HAIR-SALON-ANDROID-TEST -d Production

# run: appcenter codepush release-react -a isofhvn/ISOFHCARE-IOS-USER-TEST -d Production -m 
echo deploy to HAIR-SALON-IOS-TEST
appcenter codepush release-react -a gnurt250394/HAIR-SALON-IOS-TEST -d Production