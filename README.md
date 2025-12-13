# minimal-pwa

# 📄 Embedding PDFs from Google Drive

## Common Mistake
Many people try to embed a Google Drive PDF using the **share link**:

```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

⚠️ **Problem:** This is a *viewer page*, not the actual PDF file.  
Browsers cannot render this inside `<object>`, `<embed>`, or `<iframe>` as a PDF.

---

## Correct Links

Use one of these formats instead:

- **Direct PDF (for `<object>` / `<embed>`):**
  ```
  https://drive.google.com/uc?export=download&id=FILE_ID
  ```

- **Google Drive Viewer (for `<iframe>`):**
  ```
  https://drive.google.com/file/d/FILE_ID/preview
  ```

Replace `FILE_ID` with the long string in your Drive link (e.g. `1JFNFf7lJyyy2K-oWGuFW6H22r3lqo6hf`).

---

## Example Code

```html
<!-- Object with direct PDF -->
<object data="https://drive.google.com/uc?export=download&id=FILE_ID"
        type="application/pdf" width="100%" height="600">
  <p>Download the PDF 
     <a href="https://drive.google.com/uc?export=download&id=FILE_ID">here</a>
  </p>
</object>

<!-- Iframe with Drive preview -->
<iframe src="https://drive.google.com/file/d/FILE_ID/preview"
        width="100%" height="500"></iframe>

<!-- Embed with direct PDF -->
<embed src="https://drive.google.com/uc?export=download&id=FILE_ID"
       type="application/pdf" width="100%" height="1000" />
```

---

## Best Practices
- ✅ Always use `/preview` for Drive’s built-in viewer.  
- ✅ Use `/uc?export=download&id=...` for raw PDF embedding.  
- ✅ Provide a fallback `<a>` link so users can download the file.  
- ❌ Don’t use `/view?usp=sharing` — it won’t embed properly.  
