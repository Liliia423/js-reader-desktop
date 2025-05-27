/*use tauri::{Manager, Size, PhysicalSize, Position, PhysicalPosition, WebviewWindow};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let window: WebviewWindow = app.get_webview_window("main").unwrap();

      let monitor = window.current_monitor()?.unwrap();
      let screen_size = monitor.size();

      // 📐 Висота = 90% від висоти екрана, ширина = 50% від ширини екрана
      let height = (screen_size.height as f64 * 0.9) as u32;
      let width = (screen_size.width as f64 * 0.5) as u32;

      // 🧭 Центруємо
      let x = ((screen_size.width - width) / 2) as i32;
      let y = ((screen_size.height - height) / 2) as i32;

      window.set_size(Size::Physical(PhysicalSize::new(width, height)))?;
      window.set_position(Position::Physical(PhysicalPosition::new(x, y)))?;

      // 🪵 Логи в debug
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
use tauri::{Manager, Size, PhysicalSize, Position, PhysicalPosition, WebviewWindow};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let window: WebviewWindow = app.get_webview_window("main").unwrap();

      let monitor = window.current_monitor()?.unwrap();
      let monitor_pos = monitor.position();
      let monitor_size = monitor.size();

      // Розміри вікна
      let height = (monitor_size.height as f64 * 0.9) as u32;
      let height_adj = height.saturating_sub(40); // відняти ~40px на taskbar
      let width = (monitor_size.width as f64 * 0.5) as u32;

      // Центрування
      let x = monitor_pos.x + ((monitor_size.width - width) / 2) as i32;
      let y = monitor_pos.y + ((monitor_size.height - height_adj) / 2) as i32;

      window.set_size(Size::Physical(PhysicalSize::new(width, height_adj)))?;
      window.set_position(Position::Physical(PhysicalPosition::new(x, y)))?;

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
