import { useCallback } from 'react';
import { Upload, X, FileCode } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export function FileUpload({
  files,
  onFilesChange,
  accept = '.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.go,.rs',
  multiple = true,
  maxFiles = 10,
}: FileUploadProps) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
      e.target.value = '';
    },
    [files, maxFiles, onFilesChange]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index);
      onFilesChange(newFiles);
    },
    [files, onFilesChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      const newFiles = [...files, ...droppedFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
    },
    [files, maxFiles, onFilesChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-dark-border rounded-lg p-8 text-center hover:border-accent-blue transition-colors"
      >
        <Upload className="w-12 h-12 mx-auto text-dark-muted mb-4" />
        <p className="text-dark-primary mb-2">
          Drag and drop files here, or click to browse
        </p>
        <p className="text-sm text-dark-muted mb-4">
          Supports: {accept.split(',').join(', ')} (Max {maxFiles} files)
        </p>
        <label className="inline-block">
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
            className="hidden"
          />
          <span className="inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-primary px-4 py-2 text-base bg-accent-blue text-white hover:bg-blue-600 focus:ring-accent-blue cursor-pointer">
            Select Files
          </span>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-dark-primary">
            Selected Files ({files.length})
          </h4>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-dark-tertiary rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <FileCode className="w-5 h-5 text-accent-blue" />
                  <div>
                    <p className="text-sm text-dark-primary">{file.name}</p>
                    <p className="text-xs text-dark-muted">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-dark-muted hover:text-accent-red transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

