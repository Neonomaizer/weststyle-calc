import json, re, os
import openpyxl

def update_from_xlsx(xlsx_path, out_json='data.json'):
    with open(out_json, 'r', encoding='utf-8') as f:
        bundle = json.load(f)
    wb = openpyxl.load_workbook(xlsx_path, data_only=True, read_only=True)
    ws_roz = wb['Межкомнатные РОЗ']
    all_rows = list(ws_roz.iter_rows(max_col=15, values_only=True))
    bundle['meta']['price_title'] = f"Обновлено из {os.path.basename(xlsx_path)}"
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(bundle, f, ensure_ascii=False, indent=2)
    print("Готово:", out_json)

if __name__ == '__main__':
    files = [f for f in os.listdir('.') if f.lower().endswith('.xlsx')]
    if files:
        update_from_xlsx(files[0])
    else:
        print("Положите файл прайса .xlsx в эту папку и запустите снова.")
