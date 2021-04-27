function toast(title, icon = 'none',duration = 1500) {
	uni.showToast({
		title: title,
		icon: icon,
		duration: duration
	})
}

export default toast
