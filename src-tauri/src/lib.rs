/*#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}*/
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      // 🔧 Автоматичне встановлення розміру вікна
      let window = app.app_handle().get_window("main").unwrap();
      let monitor = window.primary_monitor()?.unwrap();
      let size = monitor.size();

      let height = (size.height as f64 * 0.9) as u32;
      let width = (height as f64 / 1.5) as u32;

      window.set_size(tauri::Size::Physical(tauri::PhysicalSize {
        width,
        height,
      }))?;

      // 🔍 Увімкнення логів тільки в debug
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
